import type { Meta, StoryObj } from "@storybook/react";
import InputText from "views/components/form/InputText";
import "/views/styles/globals.scss";
import "/views/styles/common.scss";

const meta: Meta<typeof InputText> = {
  title: "Input Text",
  component: InputText,
};

export default meta;

type Story = StoryObj<typeof InputText>;

export const InputTextDemo: Story = {
  args: {
    label: "label",
    placeholder: "placeholder",
    name: "name",
    required: true,
    error: false,
    minLength: 3,
    maxLength: 30,
  },
};

export const InputTextWithValue: Story = {
  args: {
    label: "label",
    placeholder: "placeholder",
    name: "name",
    value: "Initial value",
    required: true,
    error: false,
    minLength: 3,
    maxLength: 30,
  },
};

export const InputTextWithError: Story = {
  args: {
    label: "label",
    placeholder: "placeholder",
    name: "name",
    value: "Value",
    required: true,
    error: true,
    minLength: 3,
    maxLength: 30,
  },
};
