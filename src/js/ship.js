class Ship {
  #name;

  #length;

  #numberOfTimesHit;

  constructor(name, length) {
    this.#name = name;
    this.#length = length;
    this.#numberOfTimesHit = 0;
  }

  hit() {
    this.#numberOfTimesHit += 1;
    return this.#numberOfTimesHit;
  }

  isSunk() {
    return this.#numberOfTimesHit === this.#length;
  }

  name() {
    return this.#name;
  }

  length() {
    return this.#length;
  }
}

export default Ship;
