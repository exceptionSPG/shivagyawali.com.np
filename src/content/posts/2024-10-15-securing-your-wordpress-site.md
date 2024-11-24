---
template: blog-post
title: Securing your Wordpress site
slug: /blog/checklist-for-securing-your-wordpress-site
date: 2024-10-15 15:28
description: wordpress site, security, securing wordpress,
---
We have so many things are available to know with just little knowledge if a website is wordpress. Thus, in this article, I am listing out some ways to secure our Wordpress Site.

1. Login page Error message\
   Go to your theme's functions.php on `your-site-path/wp-content/themes/activated-theme/functions.php`, then just add these code on this file:

   ```
   add_filter('login_errors','login_error_message');

   function login_error_message($error){
       //check if that's the error you are looking for
       $pos = strpos($error, 'incorrect');
       if (is_int($pos)) {
           //its the right error so you can overwrite it
           $error = "Wrong information";
       }
       return $error;
   }
   ```

   After saving this change, our login error information will be "Wrong information" as:

   ![](/assets/wp-login-error-message.png "Showing our custom login error message.")

   \
   \
   \
   Resources:

   * <https://wordpress.stackexchange.com/a/25106>
2. Login page Directory access restriction
3. wp-json API restriction

   \
   Add this code to your theme's functions.php: `./wp-content/themes/astra/functions.php`

   ```php
   add_filter( 'rest_authentication_errors', 'rudr_turn_off_rest_api_not_logged_in' );

   function rudr_turn_off_rest_api_not_logged_in( $errors ) {

   	// if there is already an error, just return it
   	if( is_wp_error( $errors ) ) {
   		return $errors;
   	}
   	
   	if( ! is_user_logged_in() ) {
   		// return WP_Error object if user is not logged in
   		return new WP_Error( 'no_rest_api_sorry', 'REST API not allowed', array( 'status' => 401 ) );
   	}
   	
   	return $errors;
   	
   }
   ```

   ![](/assets/wp-json-reject.png "Restricing Rest api access.")

   \
   If you want to visit my client's site: <https://saiavenueconstruction.co.uk>

   \
   Resources[](https://digwp.com/2018/08/secure-wp-rest-api/)

   * <https://rudrastyh.com/wordpress/disable-rest-api.html>
   * <https://digwp.com/2018/08/secure-wp-rest-api/>
   * <https://developer.wordpress.org/rest-api/using-the-rest-api/authentication/>
4. I will add more, as I explore myself.

I host my websites using babal host service. If you are looking for efficient hosting, I genuinely recommend based on my own experience:

<a href="https://clients.babal.host/aff.php?aff=537&gocart=true"><img src="https://babal.host/img/affiliate/970x90LargeLeaderboard.png" width="970" height="90" border="0"></a>