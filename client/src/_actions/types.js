//Auth user

export const LOGIN_USER = 'login_user';
export const REGISTER_USER = 'register_user';
export const LOGOUT_USER = 'logout_user';

// Method user

export const SEARCH_USER = 'search_user';

// Contact

export const ADD_CONTACT = 'add_contact'
export const APPROVE_CONTACT_REQUEST_RECEIVED = 'approve_contact_request_recieved'
export const REMOVE_CONTACT_REQUEST = 'remove_contact_request';
export const REMOVE_CONTACT_REQUEST_RECEIVED = 'remove_contact_request_received';
export const REMOVE_CONTACT = 'remove_contact'

export const GET_CONTACT_LIST = 'get_contact_list';
export const GET_WAITING_ACCEPT_LIST = 'get_waiting_accept_list';
export const GET_FRIEND_REQUEST_LIST = 'get_friend_request_list';

export const GET_COUNT_CONTACT_ALL = 'get_count_contact_all';
export const GET_COUNT_CONTACT_WAITING_ACCEPT = 'get_count_contact_waiting_accept'
export const GET_COUNT_CONTACT_FRIEND_REQUEST = 'get_count_contact_friend_request'

// Notification

export const GET_NOTIFICATION = 'get_notification'
export const MARK_NOTIFICATION = 'mark_notification'
export const GET_COUNT_NOTIFICATION = 'get_count_notification'

export const NOTIFICATION_ADD_NEW = 'notification_add_new'
export const NOTIFICATION_REMOVE_CONTACT = 'notification_remove_contact'
export const NOTIFICATION_APPROVE_REQ_CONTACT_RECEIVED = 'notification_approve_req_contact_received'
export const NOTIFICATION_REMOVE_REQ_CONTACT_RECEIVED = 'notification_remove_req_contact_received'
export const NOTIFICATION_REMOVE_REQ_CONTACT_SENT = 'notification_remove_req_contact_sent'

// Message
export const GET_ALL_CONVERSATIONS = 'get_all_conversations'
export const GET_MESSAGES_USER = 'get_messages_user'
export const AFTER_POST_MESSAGE = 'after_post_message'
export const GET_KEY_TABS = 'get_key_tabs'
export const GET_DATA_TO_EMIT_CALL_VIDEO = "get_data_to_emit_call_video"
export const GET_ICE_TURN_SERVER = "get_ice_turn_server"