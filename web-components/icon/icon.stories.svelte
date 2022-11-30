<script>
  import { Meta, Story, Template } from '@storybook/addon-svelte-csf'

  import Icon from './Icon.svelte'
</script>

<Meta
  title="Icon"
  component={Icon}
  argTypes={{
    name: {
      control: 'text',
      description: 'The name of the icon to use',
      type: 'string',
      defaultValue: 'shield-alert-filled',
    },
    color: {
      control: 'color',
      description: 'The color to use for the icon',
      type: 'string',
    },
    size: {
      control: 'number',
      description: 'The size of the icon (defaults to 24px if not set)',
      type: 'number',
      defaultValue: 24,
    },
  }}
/>

<Template let:args>
  <div
    style={`--leo-icon-color: ${args.color}; --leo-icon-size: ${args.size}px;`}
  >
    <Icon {...args} />
  </div>
</Template>

<Story name="Default" />

<Story name="Custom Icon" let:args>
  <div
    style={`--leo-icon-color: ${args.color}; --leo-icon-size: ${args.size}px;`}
  >
    <Icon {...args}>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M21.1667 15H19.5V17.5C19.5 17.9608 19.1267 18.3333 18.6667 18.3333H2.83333C2.37333 18.3333 2 17.9608 2 17.5V5.83333C2 5.37333 2.37333 5 2.83333 5H18.6667C19.1267 5 19.5 5.37333 19.5 5.83333V8.33333H21.1667C21.6267 8.33333 22 8.70583 22 9.16667V14.1667C22 14.6275 21.6267 15 21.1667 15ZM17.8333 6.66667H3.66667V16.6667H17.8333V6.66667ZM20.3333 10H19.5V13.3333H20.3333V10ZM7 8.33333C7.46 8.33333 7.83333 8.70583 7.83333 9.16667V14.1667C7.83333 14.6275 7.46 15 7 15C6.54 15 6.16667 14.6275 6.16667 14.1667V9.16667C6.16667 8.70583 6.54 8.33333 7 8.33333ZM9.5 8.33333C9.96 8.33333 10.3333 8.70583 10.3333 9.16667V14.1667C10.3333 14.6275 9.96 15 9.5 15C9.04 15 8.66667 14.6275 8.66667 14.1667V9.16667C8.66667 8.70583 9.04 8.33333 9.5 8.33333Z"
          fill="currentColor"
        />
      </svg>
    </Icon>
  </div>
</Story>
