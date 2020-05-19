const { info, error } = console;

const handleArray = (log) => (msg) =>
  Array.isArray(msg)
    ? msg.forEach((_msg) => log(`\n${_msg}`))
    : log(`\n${msg}`);

export default {
  info: handleArray(info),
  error: handleArray(error),
};
