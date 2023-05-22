import type { Meta, StoryObj } from "@storybook/react";
import RegularButton from "client/components/buttons/RegularButton";

const meta: Meta<typeof RegularButton> = {
  title: "RegularButton",
  component: RegularButton,
};

export default meta;

type Story = StoryObj<typeof RegularButton>;

export const Outline: Story = {
  args: {
    type: "button",
    text: "Outlined Regular Button",
    style: "outline",
  },
};

export const Full: Story = {
  args: {
    type: "button",
    text: "Outlined Regular Button",
    style: "full",
  },
};
