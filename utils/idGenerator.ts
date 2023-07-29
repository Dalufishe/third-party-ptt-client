const idGenerator: () => string = () =>
  String(Math.random() + Date.now() + Math.random());

export default idGenerator;
