class NotPlainObject {}
export default function stringifyPropValueAs<Value extends object>(
  obj: Value,
  name: string | ((obj: Value) => string),
) {
  if (obj.constructor === Object) {
    obj.constructor = NotPlainObject;
  }
  obj.toString = () => (typeof name === 'function' ? name(obj) : name);
  return obj;
}
