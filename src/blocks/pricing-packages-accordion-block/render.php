<?php
wp_interactivity_config( 'willow-blocks/pricing-packages-accordion-block', [
    'apiUrl' => rest_url( 'wp/v2/pricing-package' ),
    'nonce'  => wp_create_nonce( 'wp_rest' ),
] );
?>

<div
    <?php echo get_block_wrapper_attributes(); ?>
    data-wp-interactive="willow-blocks/pricing-packages-accordion-block"
    data-wp-context='{ "posts": [], "loading": true }'
    data-wp-init="callbacks.onInit"
>
    <p data-wp-bind--hidden="!context.loading">Loading...</p>

    <div class="accordion-items-container" data-wp-bind--hidden="context.loading">
        <template data-wp-each="context.posts">
          <div
              class="accordion-item"
              data-wp-context='{ "isOpen": false }'
              data-wp-class--is-open="context.isOpen"
              data-wp-class--is-featured="selectors.isItemFeatured"
          >
            <div class="fake-button-container top-fake-button">
              <p class="fake-button">Most Popular</p>
            </div>
              <!-- Header — clicking toggles isOpen -->
            <div class="accordion-header">
              <h4 class="accordion-title" data-wp-text="selectors.packageTitle"></h4>
              <p class="description" data-wp-text="selectors.packageDescription"></p>
              <p class="price"><span class="starting-at-text">starting at</span> <span class="currency">$</span><span class="price-value" data-wp-text="selectors.packagePrice"></span></p>
              <div class="accordion-trigger-container">
                <button
                    class="accordion-trigger"
                    data-wp-on--click="actions.toggleAccordion"
                    data-wp-bind--aria-expanded="context.isOpen"
                >
                    
                  <span data-wp-text="selectors.accordionTriggerText">Expand </span>
                  <span class="icon">
                    <img
                      class="open-icon"
                      src="<?php echo esc_url( plugin_dir_url( __FILE__ ) . '../../../assets/images/open-icon.png' ); ?>"
                      alt="Expand"
                      data-wp-bind--hidden="context.isOpen"
                    />
                    <img
                      class="close-icon"
                      src="<?php echo esc_url( plugin_dir_url( __FILE__ ) . '../../../assets/images/close-icon.png' ); ?>"
                      alt="Collapse"
                      data-wp-bind--hidden="!context.isOpen"
                    />
                  </span>
                </button>
              </div>
            </div>
              <!-- Panel — shown/hidden based on isOpen -->
            <div
                  class="accordion-panel"
              >
              <div class="accordion-panel-content">
                <p class="includes-text">This package includes:</p>
                <ul class="list">
                  <template data-wp-each="state.currentListRows">
                    <li
                      class="list-item"
                      data-wp-text="context.item.text"
                      data-wp-class--is-plus="context.item.isPlus"
                    ></li>
                  </template>
                </ul>
              </div>
            </div>
            <div class="fake-button-container">
              <a class="fake-button" data-wp-bind--href="context.item.meta._pp_link.url">Select Package</a>
            </div>
          </div>
        </template>
    </div>
</div>