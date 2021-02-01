import { Evt } from 'evt';
import { produceWithPatches, enablePatches } from 'immer';

import { ws } from './helpers';

enablePatches();

type Json =
  | null
  | boolean
  | number
  | string
  | Json[]
  | { [prop: string]: Json };

enum Op {
  Test = 'test',
  Remove = 'remove',
  Add = 'add',
  Replace = 'replace',
  Move = 'move',
  Copy = 'copy',
}

interface Patch {
  op: Op;
  path: string;
  value: Json;
}

const socket = ws('ws://localhost:8080');
const evt = Evt.create<Patch[]>();
let state = {
  w: 0,
  h: 0,
};

Evt.from<MessageEvent<string>>(socket, 'message').attach(({ data }) =>
  evt.post(JSON.parse(data)),
);

Evt.from<Event>(window, 'resize').attach(() => {
  const { innerWidth: w, innerHeight: h } = window;

  let [nextState, patches] = produceWithPatches(state, (draft) => {
    draft.w = w;
    draft.h = h;
  });

  state = nextState;
  socket.send(JSON.stringify(patches));
});

evt.attach((patches) => console.log(patches));
