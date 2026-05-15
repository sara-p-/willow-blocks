<?php
/**
 * Plugin Name:       Willow Blocks
 * Description:       Custom blocks created for the Willow Theme.
 * Version:           0.1.0
 * Requires at least: 6.8
 * Requires PHP:      7.4
 * Author:            Sara Pitt
 * Author URI:				sara-pitt.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       willow-blocks
 *
 * @package CreateBlock
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}
/**
 * Registers the block(s) metadata from the `blocks-manifest.php` and registers the block type(s)
 * based on the registered block metadata. Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://make.wordpress.org/core/2025/03/13/more-efficient-block-type-registration-in-6-8/
 * @see https://make.wordpress.org/core/2024/10/17/new-block-type-registration-apis-to-improve-performance-in-wordpress-6-7/
 */
function create_block_willow_blocks_block_init() {
	wp_register_block_types_from_metadata_collection( __DIR__ . '/build/blocks', __DIR__ . '/build/blocks-manifest.php' );
}
add_action( 'init', 'create_block_willow_blocks_block_init' );


function willow_blocks_editor_assets() {
    wp_localize_script(
        'willow-blocks-pricing-packages-slider-block-editor-script',
        'willowBlocksData',
        [
            'arrowLeft'  => plugin_dir_url( __FILE__ ) . 'assets/images/arrow-left.png',
            'arrowRight' => plugin_dir_url( __FILE__ ) . 'assets/images/arrow-right.png',
        ]
    );
}
add_action( 'enqueue_block_editor_assets', 'willow_blocks_editor_assets' );


function willow_blocks_category( $categories ) {
    return array_merge(
        [
            [
                'slug'  => 'willow-blocks',
                'title' => 'Willow Blocks',
                'icon'  => null,
            ],
        ],
        $categories
    );
}
add_filter( 'block_categories_all', 'willow_blocks_category' );