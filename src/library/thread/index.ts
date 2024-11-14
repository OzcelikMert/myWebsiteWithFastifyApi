export class ThreadLibrary {
  static start(func: () => void, delay: number = 0) {
    return new Promise((resolve) =>
      setTimeout(() => {
        func();
        resolve(1);
      }, delay)
    );
  }
  static sleep(ms: number): Promise<any> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
