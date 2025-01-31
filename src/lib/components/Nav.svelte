<script lang="ts">
  interface Props {
    links: Pick<HTMLAnchorElement, 'text' | 'href'>[];
  }

  const { links = [] }: Props = $props();
</script>

<!-- <nav class="bg-[#121212] p-4">
  <ul class="flex space-x-4">
    {#each links as link}
      <li>
        <a href={link.href} class="text-white font-semibold hover:text-gray-300">{link.text}</a>
      </li>
    {/each}
  </ul>
</nav> -->