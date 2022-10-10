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
    },
    color: {
      control: 'color',
      description: 'The color to use for the icon',
      type: 'string',
    },
    size: {
      control: 'number',
      description: 'The size of the icon (defaults to 24px if not set)',
      type: 'number'
    }
  }}
/>

<Template let:args>
  <div style={`--leo-icon-color: ${args.color}; --leo-icon-size: ${args.size}px;`}>
    <Icon name="shield-alert-filled" {...args} />
  </div>
</Template>

<Story name="Default" />
