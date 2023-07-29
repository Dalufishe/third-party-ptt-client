const idGenerator: () => string = () =>
  String(Math.random() * 100) + Date.now();

export default idGenerator;
