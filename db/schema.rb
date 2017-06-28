# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170626170435) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "beverages", force: :cascade do |t|
    t.string   "label"
    t.boolean  "ice"
    t.float    "calories"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "category_id"
    t.index ["category_id"], name: "index_beverages_on_category_id", using: :btree
  end

  create_table "burger_ingredients", force: :cascade do |t|
    t.integer  "burger_id"
    t.integer  "ingredient_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["burger_id"], name: "index_burger_ingredients_on_burger_id", using: :btree
    t.index ["ingredient_id"], name: "index_burger_ingredients_on_ingredient_id", using: :btree
  end

  create_table "burgers", force: :cascade do |t|
    t.string   "label"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "categories", force: :cascade do |t|
    t.string   "label"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "category_translations", force: :cascade do |t|
    t.integer  "category_id", null: false
    t.string   "locale",      null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.string   "label"
    t.index ["category_id"], name: "index_category_translations_on_category_id", using: :btree
    t.index ["locale"], name: "index_category_translations_on_locale", using: :btree
  end

  create_table "condiment_ingredients", force: :cascade do |t|
    t.integer  "condiment_id"
    t.integer  "ingredient_id"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["condiment_id"], name: "index_condiment_ingredients_on_condiment_id", using: :btree
    t.index ["ingredient_id"], name: "index_condiment_ingredients_on_ingredient_id", using: :btree
  end

  create_table "condiments", force: :cascade do |t|
    t.string   "label"
    t.float    "calories"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "ingredient_translations", force: :cascade do |t|
    t.integer  "ingredient_id", null: false
    t.string   "locale",        null: false
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.string   "label"
    t.text     "text"
    t.index ["ingredient_id"], name: "index_ingredient_translations_on_ingredient_id", using: :btree
    t.index ["locale"], name: "index_ingredient_translations_on_locale", using: :btree
  end

  create_table "ingredients", force: :cascade do |t|
    t.string   "label"
    t.float    "calories"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
    t.integer  "category_id"
    t.index ["category_id"], name: "index_ingredients_on_category_id", using: :btree
  end

  create_table "menus", force: :cascade do |t|
    t.string   "label"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "burger_id"
    t.index ["burger_id"], name: "index_menus_on_burger_id", using: :btree
  end

  create_table "sizes", force: :cascade do |t|
    t.string   "label"
    t.float    "extra_price"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet     "current_sign_in_ip"
    t.inet     "last_sign_in_ip"
    t.datetime "created_at",                          null: false
    t.datetime "updated_at",                          null: false
    t.string   "username"
    t.index ["email"], name: "index_users_on_email", unique: true, using: :btree
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true, using: :btree
    t.index ["username"], name: "index_users_on_username", unique: true, using: :btree
  end

  add_foreign_key "beverages", "categories"
  add_foreign_key "burger_ingredients", "burgers"
  add_foreign_key "burger_ingredients", "ingredients"
  add_foreign_key "condiment_ingredients", "condiments"
  add_foreign_key "condiment_ingredients", "ingredients"
  add_foreign_key "ingredients", "categories"
  add_foreign_key "menus", "burgers"
end
