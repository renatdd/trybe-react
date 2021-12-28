class SetProperties {
  constructor(...properties) {
    this.properties = properties;
    console.log(this.properties);
    return this;
  }

  withValues(...values) {
    this.values = values;
    console.log(this.properties);
    console.log(this.values);
    return this;
  }

  getCallbackFor(object) {
    const multiplePropsForOneValue = this.values.length === 1
      && this.properties.length > 1;
    if (multiplePropsForOneValue) {
      return (
        (property) => {
          const [value] = this.values;
          object[property] = value;
        }
      );
    }
    return (
      (property, index) => { object[property] = this.values[index]; }
    );
  }

  forObject(object) {
    console.log(this.properties);
    console.log(this.values);
    console.log(object);

    this.properties.forEach(this.getCallbackFor(object));
  }
}

const dict = {};

const setProperties = (properties) => new SetProperties(properties);

console.log(setProperties('a').withValues(1).forObject(dict));
console.log(dict);
