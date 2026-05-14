<?php
wp_interactivity_config( 'willow-blocks/pricing-packages-block', [
    'apiUrl' => rest_url( 'wp/v2/pricing-package' ),
    'nonce'  => wp_create_nonce( 'wp_rest' ),
] );
?>

<div
    <?php echo get_block_wrapper_attributes(); ?>
    data-wp-interactive="willow-blocks/pricing-packages-block"
    data-wp-context='{ "posts": [], "loading": true }'
    data-wp-init="callbacks.onInit"
>
    <p data-wp-bind--hidden="!context.loading">Loading...</p>

    <div data-wp-bind--hidden="context.loading">
        <template data-wp-each="context.posts">
          <div
              class="accordion-item"
              data-wp-context='{ "isOpen": false }'
          >
              <!-- Header — clicking toggles isOpen -->
               <div class="accordion-header">
                <h2 class="accordion-title" data-wp-text="context.item.title.rendered"></h2>
                <button
                    class="accordion-trigger"
                    data-wp-on--click="actions.toggleAccordion"
                    data-wp-bind--aria-expanded="context.isOpen"
                >
                    
                  expand
                </button>
              
              </div>
              <!-- Panel — shown/hidden based on isOpen -->
              <div
                  class="accordion-panel"
                  data-wp-bind--hidden="!context.isOpen"
              >
                <p class="description" data-wp-text="context.item.meta._pp_description"></p>
                <p class="price">$<span data-wp-text="context.item.meta._pp_price"></span></p>
                <ul class="list">
                  <template data-wp-each="state.currentItems">
                    <li data-wp-text="context.item"></li>
                  </template>
                </ul>
                <a data-wp-bind--href="context.item.meta._pp_link.url">Read more</a>
              </div>
            </div>
          </div>
        </template>
    </div>
</div>