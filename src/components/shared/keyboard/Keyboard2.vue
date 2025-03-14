<template>
  <div :class="keyboardClass">
    <button class="keyboard-close-btn" @click="emit('onClose')">
      <IconClose />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, defineEmits, defineProps } from "vue";
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
import type { KeyboardLayoutObject } from "simple-keyboard";
import IconClose from "@/components/icons/IconClose.vue";

const props = defineProps({
  keyboardClass: {
    type: String,
    default: "simple-keyboard",
  },
  input: {
    type: String,
    default: "",
  },
});


const emit = defineEmits(["onChange", "onKeyPress", "onClose"]);
const keyboard = ref(null);
const currentLanguage = ref("english");
const currentLayout = ref("default");

// Define English and Russian keyboard layouts
const layouts: KeyboardLayoutObject = {
  english: {
    default: [
      "q w e r t y u i o p {bksp}",
      "a s d f g h j k l",
      "{shift} z x c v b n m {enter}",
      "{numbers} , space . {lang}"
    ],
    shift: [
      "Q W E R T Y U I O P {bksp}",
      "A S D F G H J K L",
      "{shift} Z X C V B N M {enter}",
      "{numbers} , space . {lang}"
    ],
    numbers: [
      "1 2 3 4 5 6 7 8 9 0 {bksp}",
      "@ # ₽ _ & - + ( ) /",
      "{shift} * \" ' : ; ! ? {enter}",
      "{letters} , space . {lang}"
    ]
  },
  russian: {
    default: [
      "й ц у к е н г ш щ з {bksp}",
      "ф ы в а п р о л д",
      "{shift} я ч с м и т ь {enter}",
      "{numbers} , space . {lang}"
    ],
    shift: [
      "Й Ц У К Е Н Г Ш Щ З {bksp}",
      "Ф Ы В А П Р О Л Д",
      "{shift} Я Ч С М И Т Ь {enter}",
      "{numbers} , space . {lang}"
    ],
    numbers: [
      "1 2 3 4 5 6 7 8 9 0 {bksp}",
      "@ # ₽ _ & - + ( ) /",
      "{shift} * \" ' : ; ! ? {enter}",
      "{letters} , space . {lang}"
    ]
  }
};

onMounted(() => {
  keyboard.value = new Keyboard(props.keyboardClass, {
    layout: layouts.english,
    layoutName: "default",
    display: {
      "{bksp}": "⌫",
      "{shift}": "⇧",
      "{enter}": "→",
      "{numbers}": "123",
      "{lang}": "RUS", // Default button text
      "{letters}": "АБВ",
      space: " "
    },
    onChange: (input) => emit("onChange", input),
    onKeyPress: (button) => {
      emit("onKeyPress", button);
      if (button === "{shift}") handleShift();
      if (button === "{lang}") toggleLanguage();
      if (button === "{numbers}") toggleNumbers();
      if (button === "{letters}") switchToLetters();
    },
  });
});

const toggleNumbers = () => {
  currentLayout.value = "numbers"
  keyboard.value.setOptions({
    layoutName: currentLayout.value
  });
};

// Toggle Shift (Uppercase/Lowercase)
const handleShift = () => {
  currentLayout.value = currentLayout.value === "default" ? "shift" : "default";
  keyboard.value.setOptions({
    layoutName: currentLayout.value
  });
};

const switchToLetters = () => {
  currentLayout.value = "default";

  keyboard.value.setOptions({
    layout: layouts[currentLanguage.value],
    layoutName: "default",
  });
};

const toggleLanguage = () => {
  currentLanguage.value = currentLanguage.value === "english" ? "russian" : "english";
  currentLayout.value = "default";

  keyboard.value.setOptions({
    layout: layouts[currentLanguage.value],
    layoutName: "default",
    display: {
      "{bksp}": "⌫",
      "{shift}": "⇧",
      "{enter}": "→",
      "{numbers}": "123",
      "space": " ",
      "{lang}": currentLanguage.value === "english" ? "RUS" : "ENG"
    }
  });
};

watch(() => props.input, (newValue) => {
  if (keyboard.value) {
    keyboard.value.setInput(newValue);
  }
});
</script>

<style>
/* Custom Keyboard Styling */
body .simple-keyboard .hg-button {
  background: #f8d9a7;
  border: none;
  width: 130px;
  height: 130px;
  margin: 3px;
  border-radius: 40px;
  font-size: 48px;
  flex-shrink: 0;
  font-weight: 600;
  color: var(--color-dark-beige);
  cursor: pointer;
}

body .simple-keyboard {
  max-width: 2000px !important;
  width: 2000px !important;
  min-width: 2000px !important;
  margin: 0 auto !important;
  border-radius: 80px;
  padding: 80px 212px 240px;
  background-color: var(--color-light-beige);
  position: relative;
}

body .hg-standardBtn.hg-button[data-skbtn="space"] {
  width: 714px !important;
}

.hg-row .hg-button:not(:last-child) {
  margin: 0 !important;
}
.hg-row:not(:last-child){
  margin: 0 !important;
}

.hg-theme-default .hg-button.hg-standardBtn[data-skbtn="@"] {
  max-width: 130px !important;
  width: 130px !important;
}

.hg-standardBtn {
  flex-grow: 0 !important;
  width: 130px !important;
  height: 130px !important;
}


.hg-functionBtn {
  max-width: 276px !important;
  width: 276px !important;
}

.hg-rows {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.hg-row {
  justify-content: center;
  gap: 16px;
}

.hg-button.hg-functionBtn {
  background: #d3a57c;
  color: white;
}

.keyboard-close-btn {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  background-color: unset;
  cursor: pointer;
}
</style>
