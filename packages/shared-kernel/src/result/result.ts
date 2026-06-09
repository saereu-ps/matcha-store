export type Result<T, E = Error> = OkResult<T> | ErrResult<E>;

interface OkResult<T> {
  readonly ok: true;
  readonly value: T;
}

interface ErrResult<E> {
  readonly ok: false;
  readonly error: E;
}

export function Ok<T>(value: T): OkResult<T> {
  return { ok: true, value };
}

export function Err<E>(error: E): ErrResult<E> {
  return { ok: false, error };
}
