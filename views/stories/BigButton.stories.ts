import type { Meta, StoryObj } from "@storybook/react";
import BigButton from "views/components/buttons/BigButton";

const meta: Meta<typeof BigButton> = {
  title: "BigButton",
  component: BigButton,
};

export default meta;

type Story = StoryObj<typeof BigButton>;

export const Outline: Story = {
  args: {
    type: "button",
    text: "Outlined Big Button",
    style: "outline",
  },
};

export const Full: Story = {
  args: {
    type: "button",
    text: "Outlined Big Button",
    style: "full",
  },
};
