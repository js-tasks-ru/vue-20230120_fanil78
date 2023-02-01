import { createApp } from "./vendor/vue.esm-browser.js";

createApp({
  template: `
    <div class="row">
        <div class="col">
        <input type="number" v-model="operand1" />
        </div>

        <div class="col" style="display: flex; flex-direction: column; font-family: emoji">
        <label><input type="radio" name="operator" value="sum" v-model="mathOperator" /> ➕</label>
        <label><input type="radio" name="operator" value="subtract" v-model="mathOperator"/> ➖</label>
        <label><input type="radio" name="operator" value="multiply" v-model="mathOperator"/> X </label>
        <label><input type="radio" name="operator" value="divide" v-model="mathOperator"/> ➗</label>
        </div>

        <div class="col">
        <input type="number" v-model="operand2" />
        </div>

        <div class="col">=</div>

        <output class="col">{{ calculetedResult }}</output>
    </div>
`,

  data() {
    return {
      mathOperator: "",
      operand1: null,
      operand2: null,
    };
  },

  computed: {
    calculetedResult() {
      switch (this.mathOperator) {
        case "sum":
          return this.operand1 + this.operand2;
        case "subtract":
          return this.operand1 - this.operand2;
        case "multiply":
          return this.operand1 * this.operand2;
        case "divide":
          return this.operand1 / this.operand2;

        default:
          break;
      }
    },
  },
}).mount("#app");

// Создайте Vue приложение
