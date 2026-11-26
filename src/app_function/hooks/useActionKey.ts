import { useSyncExternalStore } from "react";

const ACTION_KEY_DEFAULT = ["Ctrl ", "Control"];
const ACTION_KEY_APPLE = ["⌘", "Command"];

const emptySubscribe = () => () => {};

function getActionKeySnapshot() {
  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
    ? ACTION_KEY_APPLE
    : ACTION_KEY_DEFAULT;
}

export function useActionKey() {
  return useSyncExternalStore(
    emptySubscribe,
    getActionKeySnapshot,
    () => undefined,
  );
}
