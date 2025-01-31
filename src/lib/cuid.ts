import { init } from "@paralleldrive/cuid2";

export default (length: number = 10) => init({
  length
})();