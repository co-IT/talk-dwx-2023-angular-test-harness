import { Meta, StoryObj } from '@storybook/angular';
import { DialogComponent } from './dialog.component';
import { action } from '@storybook/addon-actions';

export default {
  title: 'DialogComponent',
  component: DialogComponent,
  argTypes: {},
} as Meta<DialogComponent>;

type Story = StoryObj<DialogComponent>;

export const Primary: Story = {
  render: (args) => ({
    template: `
      <ui-dialog (closed)="onClose()">
        <h3 dialog-header>Hello 👋</h3>
        <p dialog-body>I am a kind dialog.</p>
      </ui-dialog>
    `,
    props: {
      ...args,
      onClose: action('Dialog Closed'),
    },
  }),
};
