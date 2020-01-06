package com.allpass.utils;

import com.datastax.driver.core.utils.Bytes;
import com.google.common.collect.ArrayListMultimap;
import com.google.common.collect.Multimap;
import com.google.common.reflect.TypeToken;
import com.google.gson.*;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.codec.binary.Hex;

import java.io.UnsupportedEncodingException;
import java.lang.reflect.Type;
import java.nio.ByteBuffer;
import java.util.Collection;
import java.util.Map;

import static com.datastax.driver.core.utils.Bytes.fromRawHexString;

/**
 * Project-wide GSON.
 * <p>
 * This is only not used in certain very unique situations, this should be used almost exclusively.
 *
 * @version 2.0
 */
@Log4j2
public class GSON {

    /*
     * Creates a persistent static GSON with commonly used TypeAdapters & pretty printing
     */
    public static final com.google.gson.Gson gson = new GsonBuilder()
            .setPrettyPrinting()
            .disableHtmlEscaping()
            .enableComplexMapKeySerialization()
            .registerTypeAdapter(Multimap.class, new MultiMapAdapter())
            .create();

    /**
     * Turns a string into a hex representation of that string.
     *
     * @param string the string being converted to hex
     * @return a hex representation of the original string
     */
    public static String unhexlify(String string) {
        try {
            return new String(Bytes.fromHexString(string).array(), "UTF-8");
        } catch (UnsupportedEncodingException e) {
            log.error(e);
            throw new RuntimeException(e);
        }
    }

    /**
     * Interface / Abstract Class adapter.
     * <p>
     * This is used for specifying the class of an object when serializing. This
     * is also used for determining the class of an object when deserializing.
     *
     * @param <T> The specified abstract class / interface
     * @see <a href=https://github.com/mgechev/DistrElang/blob/master/src/org/mgechev/distrelang/InterfaceAdapter.java></a>
     */
    public static class InterfaceAdapter<T> implements JsonSerializer<T>, JsonDeserializer<T> {

        /**
         * Overridden deserialize method from {@link JsonDeserializer<T>}.
         *
         * @param json    the Json data being deserialized
         * @param typeOfT the type of the Object to deserialize to
         * @param context the context for deserialization that is passed to a custom deserializer during invocation
         * @return an object of the correct original type
         * @throws JsonParseException if json is not in the expected format of {@code typeofT}
         */
        @Override
        public T deserialize(final JsonElement json, final Type typeOfT, final JsonDeserializationContext context) throws JsonParseException {
            final JsonObject member = (JsonObject) json;
            final JsonElement typeString = get(member, "type");
            final JsonElement data = get(member, "data");
            final Type actualType = typeForName(typeString);
            return context.deserialize(data, actualType);
        }

        /**
         * Gets JSON Element based on a specified member name
         *
         * @param wrapper    the JsonObject which contains the member
         * @param memberName the member
         * @return a {@link JsonElement} from the member name
         */
        private JsonElement get(final JsonObject wrapper, final String memberName) {
            final JsonElement elem = wrapper.get(memberName);

            if (elem == null) {
                throw new JsonParseException(
                        "no '" + memberName + "' member in json file."
                );
            }
            return elem;
        }

        /**
         * Gets the class type based on the json type element
         *
         * @param typeElem the Json element containing the class name
         * @return the class type
         */
        private Type typeForName(final JsonElement typeElem) {
            try {
                return Class.forName(typeElem.getAsString());
            } catch (ClassNotFoundException e) {
                throw new JsonParseException(e);
            }
        }

        /**
         * Overridden serialize method from {@link JsonSerializer<T>}.
         *
         * @param src       the object that needs to be converted to Json.
         * @param typeOfSrc the actual type (fully genericized version) of the source object.
         * @param context   the context for serialization that is passed to a custom serializer during invocation
         * @return a JsonElement corresponding to the specified object.
         */
        @Override
        public JsonElement serialize(final T src, final Type typeOfSrc, final JsonSerializationContext context) {
            final JsonObject member = new JsonObject();
            member.addProperty("type", src.getClass().getName());
            member.add("data", context.serialize(src));
            return member;
        }
    }

    /**
     * MultiMap adapter for Guava's MultiMap.
     *
     * @param <K> the key type of the multimap
     * @param <V> the value type of the multimap
     * @see <a href=http://alex-rnv.blogspot.com/2015/04/gson-multimap.html></a>
     */
    private static final class MultiMapAdapter<K, V> implements JsonSerializer<Multimap<K, V>>, JsonDeserializer<Multimap<K, V>> {
        private static final Type asMapReturnType;

        static {
            try {
                asMapReturnType = Multimap.class.getDeclaredMethod("asMap").getGenericReturnType();
            } catch (NoSuchMethodException e) {
                throw new AssertionError(e);
            }
        }

        /**
         * Overridden serialize method from {@link JsonSerializer<>}.
         *
         * @param src       the object that needs to be converted to Json.
         * @param typeOfSrc the actual type (fully genericized version) of the source object.
         * @param context   the context for serialization that is passed to a custom serializer during invocation
         * @return a JsonElement corresponding to the specified object.
         */
        @Override
        public JsonElement serialize(Multimap<K, V> src, Type typeOfSrc, JsonSerializationContext context) {
            return context.serialize(src.asMap(), asMapType(typeOfSrc));
        }

        /**
         * Overridden deserialize method from {@link JsonDeserializer<>}.
         *
         * @param json    the Json data being deserialized
         * @param typeOfT the type of the Object to deserialize to
         * @param context the context for deserialization that is passed to a custom deserializer during invocation
         * @return an multimap of the correct original types
         * @throws JsonParseException if json is not in the expected format of {@code typeofT}
         */
        @Override
        public Multimap<K, V> deserialize(JsonElement json, Type typeOfT, JsonDeserializationContext context)
                throws JsonParseException {
            Map<K, Collection<V>> asMap = context.deserialize(json, asMapType(typeOfT));
            Multimap<K, V> multimap = ArrayListMultimap.create();
            for (Map.Entry<K, Collection<V>> entry : asMap.entrySet()) {
                multimap.putAll(entry.getKey(), entry.getValue());
            }
            return multimap;
        }

        /**
         * Gets map type of src type.
         *
         * @param multimapType type of multimap
         * @return Class type of multimap
         */
        private static Type asMapType(Type multimapType) {
            return TypeToken.of(multimapType).resolveType(asMapReturnType).getType();
        }
    }
}