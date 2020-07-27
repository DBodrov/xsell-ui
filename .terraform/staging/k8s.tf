variable "k8s_token" {
  type = string
}

variable "k8s_host" {
  type = string
}

variable "k8s_client_cert" {
  type = string
}

variable "k8s_client_key" {
  type = string
}

variable "k8s_cluster_ca_cert" {
  type = string
}

provider "kubernetes" {
  version                = "1.11.3"
  load_config_file       = false
  token                  = var.k8s_token
  host                   = var.k8s_host
  client_certificate     = base64decode(var.k8s_client_cert)
  client_key             = base64decode(var.k8s_client_key)
  cluster_ca_certificate = base64decode(var.k8s_cluster_ca_cert)
}
