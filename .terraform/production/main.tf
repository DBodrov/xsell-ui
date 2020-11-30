locals {
  module-name = "x-sell-ui"
}

variable "image_version" {
  type = string
}

variable "k8s_default_node_group" {
  type = string
}

variable "namespace" {
  type = string
}

module "x-sell-ui" {
  source = "../modules/x-sell-ui"
  image_version = var.image_version
  node_label = var.k8s_default_node_group
  host = "cash.otpbank.ru"
  tls_secret_name = "tls-secret"
  use_letsencrypt = false
  namespace = "x-sell-dev"
}

