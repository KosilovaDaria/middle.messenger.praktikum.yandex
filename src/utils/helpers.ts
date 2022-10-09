/* eslint-disable no-continue */
/* eslint-disable no-restricted-syntax */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable import/prefer-default-export */
type Indexed<T = any> = {
  [key in string]: T;
};

function merge(lhs: Indexed, rhs: Indexed): Indexed {
  // eslint-disable-next-line no-restricted-syntax, prefer-const
  for (let key in rhs) {
    // eslint-disable-next-line no-prototype-builtins
    if (!rhs.hasOwnProperty(key)) {
      // eslint-disable-next-line no-continue
      continue;
    }
    try {
      if (rhs[key].constructor === Object) {
        lhs[key] = merge(lhs[key] as Indexed, rhs[key] as Indexed)
      } else {
        lhs[key] = rhs[key]
      }
    } catch (e) {
      lhs[key] = rhs[key]
    }
  }
  return lhs
}

export function set(object: Indexed | unknown, path: string, value: unknown): Indexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }
  if (path.constructor !== String) {
    throw new Error('path must be string');
  }
  const result = path.split('.').reduceRight<Indexed>((acc, key) => ({ [key]: acc }), value as any);
  return merge(object as Indexed, result);
}

function isPlainObject(value: unknown): value is Indexed {
  return typeof value === 'object'
      && value !== null
      && value.constructor === Object
      && Object.prototype.toString.call(value) === '[object Object]';
}
function isArray(value: unknown): value is [] {
  return Array.isArray(value);
}
function isArrayOrObject(value: unknown): value is [] | Indexed {
  return isPlainObject(value) || isArray(value);
}
export function isEqual(lhs: Indexed, rhs: Indexed) {
  if (Object.keys(lhs).length !== Object.keys(rhs).length) {
    return false;
  }
  for (const [key, value] of Object.entries(lhs)) {
    const rightValue = rhs[key];
    if (isArrayOrObject(value) && isArrayOrObject(rightValue)) {
      if (isEqual(value, rightValue)) {
        continue;
      }
      return false;
    }
    if (value !== rightValue) {
        return false;
    }
  }

  return true;
}

export function getDate(value: string) {
  const fullDate = new Date(value);
  const date = `${fullDate.getHours()}:${fullDate.getMinutes()}`;
  return date
}
