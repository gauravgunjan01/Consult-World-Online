//! Auth
//* Customer Auth
export const customer_login = 'api/auth/send-otp-to-customer';
export const customer_login_otp = 'api/auth/verify-customer-otp';
export const customer_update_profile = 'api/customers/update_profile_intake';
export const customer_change_picture = 'api/customers/change_profile';

//* Astrologer Auth
export const astrologer_login = 'api/auth/astrologer-login';

//* Logout
export const user_logout = 'api/logout';

//* Enquiry Premium Service
export const enquiry_premium_service = 'api/customers/customer_consult';

//! User
export const get_user_customer_details = 'api/auth/customer-details';
export const recharge_user_customer_wallet = 'api/customers/check_razorpay_payment_status';
export const get_user_customer_completed_queue_list = 'api/customers/get_customer_completed_queues';
export const update_user_customer_completed_queue_list_read_status = 'api/customers/update_queue_read_status';
export const get_user_customer_wallet_history = 'api/customers/get-customer-recharge-history';
export const get_user_customer_transaction_history = 'api/customers/customer_service_transaction_history_by_id';
export const get_user_customer_order_history = 'api/ecommerce/get_product_order_history';
export const get_user_customer_puja_book_history = 'api/puja/get_customer_booked_puja';
export const get_user_customer_astro_mall_history = 'api/ecommerce/get_product_order_history_by_id';
export const get_user_customer_address = 'api/puja/get_address_puja_by_customer';
export const create_user_customer_address = 'api/puja/add_address_puja';
export const update_user_customer_address = 'api/puja/update_address_puja';
export const delete_user_customer_address = 'api/puja/delete_address_puja';

export const get_user_astrologer_details = 'api/auth/astrologer-details';
export const change_user_astrologer_chat_status = 'api/astrologer/change-chat-status';
export const change_user_astrologer_call_status = 'api/astrologer/change-call-status';
export const change_user_astrologer_video_call_status = 'api/admin/change_videocall_status';
export const user_astrologer_withdrawal_request = 'api/astrologer/withdraw_request';
export const get_user_astrologer_pending_queue_list = 'api/customers/get_astrologer_queues';
export const get_user_astrologer_completed_queue_list = 'api/customers/get_astrologer_message';
export const update_user_astrologer_pending_queue_list_status = 'api/customers/update_queue_status';
export const get_user_astrologer_wallet_history = 'api/admin/astrologer_transaction_histroy';
export const get_user_astrologer_transaction_history = 'api/astrologer/astrologer_service_transaction_history_by_id';
export const get_user_astrologer_registered_puja_history = 'api/puja/get_puja_register_by_astrolgerId';
export const get_user_astrologer_assigned_puja_history = 'api/puja/get_assign_by_astrologer';
export const get_user_astrologer_booked_puja_history = 'api/ecommerce/get_customer_booked_puja_by_astrologerId';
export const complete_booked_puja_history = 'api/ecommerce/complete_astrologer_pooja';

export const get_user_queue_predefined_message = 'api/admin/get_predefined_message';

//! Astrologer
export const get_astrologer = 'api/astrologer/astrologer_filter?page=1&limit=4';
export const get_astrologer_by_id = 'api/astrologer/get-astrologer-details';
export const get_astrologer_review_by_id = 'api/admin/get-astrologer-review';
export const get_astrologer_skill = 'api/admin/get-skill';
export const get_astrologer_main_expertise = 'api/admin/get-all-main-expertise';
export const follow_unfollow_astrologer = 'api/customers/follow_astrolgoer';
export const get_astrologer_followed_status_by_customer = 'api/customers/check_customer_following';

// TODO : Consultation
export const get_linked_profile_for_consultation = 'api/customers/get-linked-profile';
export const create_profile_for_chat = 'api/customers/add-profile';
export const initiate_chat_message = 'api/customers/initiate-chat';

//* Video Call
export const initiate_video_call = 'api/customers/initiateVideoCall';
export const accept_video_call = 'api/customers/accept_video_call';
export const reject_video_call = 'api/customers/reject_video_call';

//* Voice Call
export const initiate_voice_call = 'api/customers/initiate-call';
export const accept_voice_call = 'api/customers/accept_voice_call';
export const reject_voice_call = 'api/customers/reject_voice_call';

//! Ecommerce
export const get_product_category = 'api/ecommerce/get_product_category';
export const get_products = 'api/ecommerce/get_products';

export const get_suggested_puja = 'api/puja/get_suggested_remedies';
export const get_puja = 'api/puja/get_puja';
export const get_customer_cart = 'api/puja/get_cart';

export const add_to_cart = 'api/puja/add_to_cart';
export const update_cart_item_quantity = 'api/puja/update_cart_quantity';
export const order_product = 'api/puja/book_puja';

//* This is for astrologer side UI
export const get_created_puja = 'api/puja/get_puja';
export const register_created_puja = 'api/puja/astro_register_for_puja';
//* This is for customer side UI
export const get_approved_created_puja = 'api/puja/get_puja';
export const book_approved_created_puja = 'api/ecommerce/razorpay_payment_status_for_book_puja';

//! Astromall
export const get_astro_mall_category = 'api/ecommerce/get_product_category';
export const get_astro_mall_product = 'api/ecommerce/get_products';
export const add_astro_mall_product_to_cart = 'api/ecommerce/add_to_cart';
export const get_customer_astro_mall_cart = 'api/ecommerce/get_customer_cart';
export const update_astro_mall_cart_item_quantity = 'api/ecommerce/update_cart_item_quantity';
export const order_astro_mall_cart = 'api/ecommerce/order_product';

//! Blog
export const get_astro_blog_category = 'api/admin/blog-category-list';
export const get_astro_blog = (page = 1, limit = 10, categoryId = '', search = '') => `api/customers/all_blogs?page=${page}&limit=${limit}&blogCategoryId=${categoryId}&search=${search}`;
export const get_astro_blog_details = 'api/customers/blog_detail';
export const increment_astro_blog_view_count = (blogId) => `api/customers/increment_view_count/${blogId}`;

//! Static Page
export const get_terms_and_conditions = 'api/admin/get-terms-condition';
export const get_privacy_policy = 'api/admin/get-privacy-policy';
export const get_about_us = 'api/admin/get-about-us';

//! Profile
export const create_kundli_matching_profile = 'api/customers/match_save';
export const get_kundli_matching_profile = 'api/customers/match_data';
export const get_kundli_matching_profile_by_id = 'api/customers/match_date_by_id';

//! Astrology API
//* Horoscope
export const get_daily_horoscope = (zodiacName) => `https://json.astrologyapi.com/v1/sun_sign_prediction/daily/${zodiacName}`;
export const get_daily_tomorrow_horoscope = (zodiacName) => `https://json.astrologyapi.com/v1/sun_sign_prediction/daily/next/${zodiacName}`;
export const get_daily_yesterday_horoscope = (zodiacName) => `https://json.astrologyapi.com/v1/sun_sign_prediction/daily/previous/${zodiacName}`;
export const get_monthly_horoscope = (zodiacName) => `https://json.astrologyapi.com/v1/horoscope_prediction/monthly/${zodiacName}`;
export const get_horoscope = 'https://kundli2.astrosetalk.com/api/horoscope/get_horoscope'

//* Kundli Matching
export const get_kundli_matching_birth_details = 'https://json.astrologyapi.com/v1/match_birth_details';
export const get_kundli_matching_astro_details = 'https://json.astrologyapi.com/v1/match_astro_details';
export const get_kundli_matching_dashakoot_points_details = 'https://json.astrologyapi.com/v1/match_dashakoot_points';
export const get_kundli_matching_ashtakoot_points_details = 'https://json.astrologyapi.com/v1/match_ashtakoot_points';
export const get_kundli_matching_manglik_report_details = 'https://json.astrologyapi.com/v1/match_manglik_report';
export const get_asthakoota = 'https://kundli2.astrosetalk.com/api/kundali/get_asthakoota_data';
export const get_astro_data = 'https://kundli2.astrosetalk.com/api/kundali/get_astro_data';