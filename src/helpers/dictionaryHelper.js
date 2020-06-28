

export const findElement = (topElement, classToFind) => {
  let a = topElement;
  while (a) {
    if (a.classList.contains(classToFind)) return a;
    a = a.parentNode;
    if (a.tagName === 'MAIN') return null;
    if (a.tagName === 'HTML') return null;
  }
  return null;
}