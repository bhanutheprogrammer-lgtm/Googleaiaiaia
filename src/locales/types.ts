export interface TranslationSchema {
  // Brand & Global
  app_name: string;
  app_badge_handmade: string;
  app_tagline_guest: string;
  app_tagline_buyer: string;
  app_tagline_artisan: string;
  switch_view_label: string;
  role_artisan: string;
  role_buyer: string;
  role_guest: string;

  // Navbars
  nav_crafts: string;
  nav_marketplace: string;
  nav_stories: string;
  nav_map: string;
  nav_scan: string;
  nav_catalog: string;
  nav_inquiries: string;
  nav_pricing: string;
  nav_qr: string;
  nav_pitara: string;
  nav_certificates: string;
  nav_login: string;
  nav_logout: string;
  nav_choose_lang: string;
  nav_settings: string;
  nav_patron_badge: string;
  nav_artisan_badge: string;

  // Hero Section
  hero_lead: string;
  hero_title_1: string;
  hero_title_highlight: string;
  hero_title_2: string;
  hero_subtitle: string;
  hero_stamp_handmade: string;
  hero_stamp_gi: string;
  hero_ai_title: string;
  hero_ai_subtitle: string;
  hero_search_placeholder: string;
  hero_clear: string;
  hero_explore: string;
  hero_verified_listing: string;
  hero_heritage_badge: string;
  hero_featured_title: string;
  hero_featured_desc: string;
  hero_virasat_katha: string;
  hero_virasat_excerpt: string;
  hero_fair_price_title: string;
  hero_material_cost: string;
  hero_artisan_wage: string;
  hero_logistics: string;
  hero_whatsapp_buy: string;

  // Bazaar / Craft Grid
  bazaar_badge: string;
  bazaar_title: string;
  bazaar_subtitle: string;
  bazaar_all_states: string;
  bazaar_gi_only: string;
  bazaar_no_crafts: string;
  bazaar_no_crafts_sub: string;
  bazaar_shuddh_handmade: string;
  bazaar_gi_seal: string;
  bazaar_days_crafting: string;
  bazaar_fair_price_label: string;
  bazaar_read_story: string;
  bazaar_buy_whatsapp: string;

  // Categories
  cat_all: string;
  cat_handloom: string;
  cat_clay: string;
  cat_metal: string;
  cat_folk: string;
  cat_wood: string;

  // Map Section
  map_badge: string;
  map_title: string;
  map_subtitle: string;
  map_gi_tags: string;
  map_key_crafts: string;
  map_registered_lineages: string;
  map_verified_karigars: string;
  map_explore_state: string;

  // Stories Section
  stories_badge: string;
  stories_title: string;
  stories_subtitle: string;
  stories_gi_seal: string;
  stories_fair_price: string;
  stories_full_details: string;
  stories_buy_whatsapp: string;
  stories_listen: string;

  // AI Scan Studio
  studio_badge: string;
  studio_title: string;
  studio_subtitle: string;
  studio_output_lang: string;
  studio_judge_presets: string;
  studio_tap_to_load: string;
  studio_dropzone_title: string;
  studio_dropzone_cta: string;
  studio_dropzone_sub: string;
  studio_change_image: string;
  studio_voice_label: string;
  studio_voice_speak: string;
  studio_voice_listening: string;
  studio_voice_placeholder: string;
  studio_scan_btn: string;
  studio_scanning_btn: string;
  studio_success_title: string;
  studio_view_cert: string;
  studio_view_bazaar: string;
  studio_verified_draft: string;
  studio_global_title: string;
  studio_devanagari_title: string;
  studio_regional_title: string;
  studio_craft_lineage: string;
  studio_heritage_story: string;
  studio_regional_story: string;
  studio_materials_detected: string;
  studio_smart_tags: string;
  studio_fair_price_advisor: string;
  studio_raw_material: string;
  studio_fair_wage: string;
  studio_retail_benchmark: string;
  studio_publish_btn: string;
  studio_empty_title: string;
  studio_empty_sub: string;

  // Artisan Studio Dashboard Overview
  dash_custodian: string;
  dash_years_crafting: string;
  dash_new_scan: string;
  dash_crafts_count: string;
  dash_views_count: string;
  dash_inquiries_count: string;
  dash_catalog_val: string;
  dash_ledger_title: string;
  dash_ledger_sub: string;
  dash_add_craft: string;
  dash_days_work: string;
  dash_direct_price: string;
  dash_view_cert: string;
  dash_delete_craft: string;
  dash_inbox_title: string;
  dash_inbox_sub: string;
  dash_new_inquiry: string;
  dash_replied: string;
  dash_buyer_msg: string;
  dash_translate_btn: string;
  dash_translating: string;
  dash_translation_title: string;
  dash_reply_label: string;
  dash_send_reply: string;
  dash_reply_sent: string;
  dash_artisan_greeting: string;
  dash_karkhana_badge: string;
  dash_gi_certified_guild: string;
  dash_zero_middleman: string;

  // Artisan Catalog Manager
  catalog_badge: string;
  catalog_title: string;
  catalog_subtitle: string;
  catalog_add_new_ai: string;
  catalog_empty_title: string;
  catalog_empty_sub: string;
  catalog_empty_cta: string;
  catalog_in_stock: string;
  catalog_out_of_stock: string;
  catalog_crafting_days: string;
  catalog_wage: string;
  catalog_fair_price: string;
  catalog_edit_btn: string;
  catalog_cert_btn: string;
  catalog_whatsapp_lead: string;
  catalog_delete_btn: string;
  catalog_edit_modal_title: string;
  catalog_edit_title_label: string;
  catalog_edit_price_label: string;
  catalog_edit_wage_label: string;
  catalog_edit_days_label: string;
  catalog_cancel: string;
  catalog_save: string;

  // Artisan Inquiries Ledger
  inquiries_badge: string;
  inquiries_title: string;
  inquiries_subtitle: string;
  inquiries_filter_all: string;
  inquiries_filter_new: string;
  inquiries_filter_discussion: string;
  inquiries_filter_completed: string;
  inquiries_no_match: string;
  inquiries_status_new: string;
  inquiries_status_discussion: string;
  inquiries_status_completed: string;
  inquiries_interested_in: string;
  inquiries_buyer_msg_title: string;
  inquiries_vernacular_tag: string;
  inquiries_status_label: string;
  inquiries_reply_whatsapp: string;

  // Artisan Fair Price Calculator
  calc_badge: string;
  calc_title: string;
  calc_subtitle: string;
  calc_materials_title: string;
  calc_time_title: string;
  calc_crafting_days: string;
  calc_daily_wage: string;
  calc_overhead_title: string;
  calc_packaging_cost: string;
  calc_breakdown_title: string;
  calc_raw_material_cost: string;
  calc_artisan_wage_total: string;
  calc_packaging_logistics: string;
  calc_guild_development: string;
  calc_recommended_price: string;
  calc_middleman_comparison: string;
  calc_artisan_retention: string;

  // Artisan Store QR Flyer
  qr_badge: string;
  qr_title: string;
  qr_subtitle: string;
  qr_print_btn: string;
  qr_gov_gi_badge: string;
  qr_scan_instruction: string;
  qr_scan_sub: string;
  qr_direct_whatsapp: string;
  qr_direct_upi: string;
  qr_footer_stamp: string;

  // Buyer Marketplace & Vault
  buyer_banner_badge: string;
  buyer_welcome: string;
  buyer_direct_patronage: string;
  buyer_wages_supported: string;
  buyer_middleman_free: string;
  buyer_families_empowered: string;
  buyer_saved_pitara: string;
  buyer_click_pitara: string;
  buyer_cert_vault: string;
  buyer_download_parchment: string;
  vault_badge: string;
  vault_title: string;
  vault_subtitle: string;
  vault_verified_count: string;
  vault_registered_cert: string;
  vault_master_karigar: string;
  vault_purity_provenance: string;
  vault_issued_date: string;
  vault_view_cert: string;

  // Guest Gateway
  guest_artisan_card_badge: string;
  guest_artisan_card_title: string;
  guest_artisan_card_desc: string;
  guest_artisan_card_cta: string;
  guest_buyer_card_badge: string;
  guest_buyer_card_title: string;
  guest_buyer_card_desc: string;
  guest_buyer_card_cta: string;

  // Mera Pitara
  pitara_title: string;
  pitara_subtitle: string;
  pitara_empty_title: string;
  pitara_empty_desc: string;
  pitara_explore_cta: string;
  pitara_impact_summary: string;
  pitara_fair_wages_total: string;
  pitara_days_sustained: string;
  pitara_checkout_whatsapp: string;
  pitara_remove: string;
  pitara_order_single: string;

  // Story Drawer
  drawer_share: string;
  drawer_lineage_title: string;
  drawer_verified_karigar: string;
  drawer_virasat_title: string;
  drawer_materials_dyes: string;
  drawer_fair_price_title: string;
  drawer_raw_material: string;
  drawer_artisan_wage: string;
  drawer_direct_benchmark: string;
  drawer_care_title: string;
  drawer_direct_trade: string;
  drawer_cert_btn: string;
  drawer_whatsapp_cta: string;

  // Certificate Modal
  cert_badge: string;
  cert_print: string;
  cert_gov_header: string;
  cert_main_title: string;
  cert_sub_title: string;
  cert_craft_name: string;
  cert_artisan_origin: string;
  cert_category_time: string;
  cert_lineage_citation_title: string;
  cert_lineage_citation_body: string;
  cert_scan_verify: string;
  cert_unique_hash: string;
  cert_seal_handmade: string;
  cert_seal_gi: string;

  // Footer
  footer_tagline: string;
  footer_mission: string;
  footer_seal: string;
  footer_nav_title: string;
  footer_lang_title: string;
  footer_rights: string;
  footer_10_lang: string;
  footer_verified_gi: string;
}
