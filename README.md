# xfinite

This package enables the implementation of a [Finite State Machine](https://en.wikipedia.org/wiki/Finite-state_machine).

> A **finite-state machine** (**FSM**) or **finite-state automaton** (**FSA**, plural: _automata_), **finite automaton**, or simply a **state machine**, is a mathematical model of computation. It is an abstract machine that can be in exactly one of a finite number of states at any given time. The FSM can change from one state to another in response to some inputs; the change from one state to another is called a **transition**. An FSM is defined by a list of its states, its initial state, and the inputs that trigger each transition. Finite-state machines are of two types—deterministic finite-state machines and non-deterministic finite-state machines. A deterministic finite-state machine can be constructed equivalent to any non-deterministic one.<a name="wiki"><sup>1</sup></a>

| Published                                                                                                      | Size (repository)                                                                 | Size (minified)                                                                   |
| -------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| <a href="https://www.npmjs.com/package/xfinite"><img alt="npm" src="https://img.shields.io/npm/v/xfinite"></a> | ![GitHub repo size](https://img.shields.io/github/repo-size/zachnewburgh/xfinite) | <img alt="npm bundle size" src="https://img.shields.io/bundlephobia/min/xfinite"> |

| Statements                                                                  | Branches                                                                  | Functions                                                                  | Lines                                                                  |
| --------------------------------------------------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| ![Statements](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Branches](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Functions](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) | ![Lines](https://img.shields.io/badge/Coverage-100%25-brightgreen.svg) |

## Table of Contents

- [Getting Started](#getting-started)
- [License](#license)

## Getting Started

### Install the Package

```bash
  npm i xfinite
```

### Add the Imports

```bash
  import { Machine, State, Input } from 'xfinite';
```

### Define the Inputs

```bash
  const INPUT = {
    coin: 0.25,
    push: 'push',
  };

  const coin = new Input(INPUT.coin, STATE.unlocked);
  const push = new Input(INPUT.push, STATE.locked);
```

### Define the States

```bash
  const STATE = {
    locked: 'locked',
    unlocked: 'unlocked',
  };

  const locked = new State(STATE.locked, [coin]);
  const unlocked = new State(STATE.unlocked, [push]);
```

### Initialize the Machine

```bash
  const turnstile = new Machine().addStates([locked, unlocked]).build(STATE.locked);
```

### Execute the Machine

```bash
  turnstile.next(INPUT.coin).active; // 'unlocked'

  turnstile.next(INPUT.push).active; // 'locked'

  turnstile.next(INPUT.push).active; // 'locked'

  turnstile.next().active;           // 'locked'

  turnstile.next(INPUT.coin).active; // 'unlocked'

  turnstile.next('foo').active;      // 'unlocked'

  turnstile.next(INPUT.push).active; // 'locked'
```

### Listen to State Changes

```bash
const onStateChange = (previous: string, current: string) => {
  console.log(`Previous: ${previous} | Current: ${current}`);
};
turnstile.onStateChange = onStateChange;

turnstile.active // 'locked'
turnstile.next(INPUT.push) // console: 'Previous: locked | Current: unlocked'
```

## License

xfinite is [ISC licensed](./LICENSE).

### Footnotes

<sup>[1](#wiki)</sup> [Finite State Machine](https://en.wikipedia.org/wiki/Finite-state_machine)
