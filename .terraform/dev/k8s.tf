variable "kubeconfig" {
  type = string
}

provider "kubernetes" {
  version          = "1.12.0"
  load_config_file = true
  config_path      = var.kubeconfig
}
