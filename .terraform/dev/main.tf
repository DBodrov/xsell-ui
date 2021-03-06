locals {
  module-name = "x-sell-ui"
}

variable "image_version" {
  type = "string"
  default = "dev"
}

variable "namespace" {
  type = string
}

module "x-sell-ui" {
  source = "../modules/x-sell-ui"
  image_version = var.image_version
  node_label = null
  host = "cash.dev.productcloud.ru"
  tls_secret_name = "cash-otpcloud-ru-tls"
  use_letsencrypt = true
  namespace = "x-sell-dev"
}

