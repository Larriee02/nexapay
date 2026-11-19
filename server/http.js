export function problem(status, message) {
  return Object.assign(new Error(message), { status });
}

export function required(value, max, label) {
  if (typeof value !== 'string' || !value.trim() || value.trim().length > max) {
    throw problem(400, `${label} must contain 1–${max} characters.`);
  }
  return value.trim();
}

export function email(value) {
  const address = required(value, 254, 'Email').toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) throw problem(400, 'Enter a valid email address.');
  return address;
}

export function choice(value, options, label) {
  if (!options.includes(value)) throw problem(400, `Choose a valid ${label}.`);
  return value;
}

export function uuid(value) {
  if (typeof value !== 'string' || !/^[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i.test(value)) {
    throw problem(400, 'Invalid record identifier.');
  }
  return value;
}

export function allow(role) {
  return (req, res, next) => {
    if (!req.user) return next(problem(401, 'Sign in to continue.'));
    if (role && req.user.role !== role) return next(problem(403, 'You do not have access to this workspace.'));
    next();
  };
}
