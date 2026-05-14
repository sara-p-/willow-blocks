<?php
// This file is generated. Do not modify it manually.
return array(
	'pricing-accordion' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'willow-blocks/pricing-accordion',
		'version' => '0.1.0',
		'title' => 'Pricing Accordion',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'A custom Accordion Item for the Pricing Section of the Willow Theme.',
		'example' => array(
			
		),
		'attributes' => array(
			'featured' => array(
				'type' => 'boolean',
				'default' => false
			),
			'link' => array(
				'type' => 'string',
				'default' => ''
			)
		),
		'supports' => array(
			'html' => false
		),
		'textdomain' => 'willow-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScript' => 'file:./view.js'
	),
	'pricing-packages-block' => array(
		'$schema' => 'https://schemas.wp.org/trunk/block.json',
		'apiVersion' => 3,
		'name' => 'willow-blocks/pricing-package-block',
		'version' => '0.1.0',
		'title' => 'Pricing Packages Block',
		'category' => 'widgets',
		'icon' => 'smiley',
		'description' => 'A custom block for the Pricing Section of the Willow Theme.',
		'example' => array(
			
		),
		'supports' => array(
			'html' => false,
			'interactivity' => true
		),
		'textdomain' => 'willow-blocks',
		'editorScript' => 'file:./index.js',
		'editorStyle' => 'file:./index.css',
		'style' => 'file:./style-index.css',
		'viewScriptModule' => 'file:./view.js',
		'render' => 'file:./render.php'
	)
);
