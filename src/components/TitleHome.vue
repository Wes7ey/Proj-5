<template>
  <div class="content">
    <p class="typedtext" :class="{ removing: removing }" v-html="typedText"></p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contactTexts: [
        "Bem vindo(a), de volta!😊",
        "Comece clicando aqui do lado e criando uma nova lista!",
        "Crie tarefas e controle sua rotina",
        "Marque suas tarefas concluídas e controle seu dia a dia",
        "Nunca é cedo para planejar o amanhã 🤗",
      ],
      typedText: "",
      removing: false,
      idx: 0,
      char: 0,
    };
  },
  mounted() {
    setInterval(this.typingEffect, 100);
  },
  methods: {
    typingEffect() {
      if (this.char < this.contactTexts[this.idx].length)
        this.typedText += this.contactTexts[this.idx][this.char];

      if (this.char === this.contactTexts[this.idx].length + 15)
        this.removing = true;

      if (this.removing)
        this.typedText = this.typedText.substring(0, this.typedText.length - 1);

      this.char++;

      if (this.typedText.length === 0) {
        if (this.idx === this.contactTexts.length - 1) this.idx = 0;
        else this.idx++;

        this.char = 0;
        this.removing = false;
      }
    },
  },
};
</script>

<style scoped>
* {
  font-family: Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
    sans-serif, Arial;
}
.content {
  width: 80%;
  height: 20%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.typedtext {
  border-right: 2px solid black;
  animation: blinkTextCursor 800ms steps(44) infinite normal;
  height: 40px;
  color: #000;
  display: block;
}

.typedtext.removing {
  animation: none;
}

@keyframes blinkTextCursor {
  from {
    border-right-color: black;
  }
  to {
    border-right-color: transparent;
  }
}
</style>
