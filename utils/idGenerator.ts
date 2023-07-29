const idGenerator: () => string = () => String(Math.random() + Date.now());

export default idGenerator;
