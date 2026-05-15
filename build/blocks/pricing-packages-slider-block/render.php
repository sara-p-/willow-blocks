<?php
wp_interactivity_config( 'willow-blocks/pricing-packages-slider-block', [
    'apiUrl' => rest_url( 'wp/v2/pricing-package' ),
    'nonce'  => wp_create_nonce( 'wp_rest' ),
] );
?>

<div
    <?php echo get_block_wrapper_attributes(); ?>
    data-wp-interactive="willow-blocks/pricing-packages-slider-block"
    data-wp-context='{ "posts": [], "loading": true }'
    data-wp-init="callbacks.onInit"
>
    <p data-wp-bind--hidden="!context.loading">Loading...</p>

    <div class="slider" data-wp-bind--hidden="context.loading">
      <div class="slider-wrapper">
        <div class="slider-track">
        <template data-wp-each="context.posts">
          <div
              class="slide"
              data-wp-class--is-featured="selectors.isItemFeatured"
          >
          <p data-wp-text="selectors.debugListRows"></p>
            <div class="fake-button-container top-fake-button">
              <p class="fake-button">Most Popular</p>
            </div>
              <!-- Header  -->
              <h4 class="title" data-wp-text="selectors.packageTitle"></h4>
              <p class="description" data-wp-text="selectors.packageDescription"></p>
              <p class="price"><span class="starting-at-text">starting at</span> <span class="currency">$</span><span class="price-value" data-wp-text="selectors.packagePrice"></span></p>
            
            <p class="includes-text">This package includes:</p>
            <ul class="list">
              <template data-wp-each="context.item.listRows">
                <li
                  class="list-item"
                  data-wp-text="context.item.text"
                  data-wp-class--is-plus="context.item.isPlus"
                ></li>
              </template>
            </ul>
              
            <div class="fake-button-container">
              <a class="fake-button" data-wp-bind--href="context.item.meta._pp_link.url">Select Package</a>
            </div>
          </div>
        </template>
        </div>
      </div>
    </div>
    <div class="slider-nav">
      <button
        class="slider-nav-button prev"
        data-wp-on--click="actions.prev"
      >
        <span class="icon">
          <img src="<?php echo esc_url( plugin_dir_url( __FILE__ ) . '../../../assets/images/arrow-left.png' ); ?>" alt="Previous">
        </span>
      </button>
      <button
        class="slider-nav-button next"
        data-wp-on--click="actions.next"
      >
        <span class="icon">
          <img src="<?php echo esc_url( plugin_dir_url( __FILE__ ) . '../../../assets/images/arrow-right.png' ); ?>" alt="Next">
        </span>
      </button>
    </div>
</div>