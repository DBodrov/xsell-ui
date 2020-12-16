variable "image_version" {
  type = string
  default = "staging"
}
variable "host" {
  type = string
}

variable "tls_secret_name" {
  type = string
}

variable "node_label" {
  type = string
}

variable "use_letsencrypt" {
  type = bool
}

variable "namespace" {
  type = string
}

resource "kubernetes_deployment" "x-sell-ui" {
  metadata {
    name = "x-sell-ui"
    namespace = var.namespace
    labels = {
      app = "x-sell-ui"
    }
  }
  spec {
    replicas = 3
    selector {
      match_labels = {
        app = "x-sell-ui"
      }
    }
    template {
      metadata {
        labels = {
          app = "x-sell-ui"
        }
      }
      spec {
        node_selector = {
          "mcs.mail.ru/mcs-nodepool" = var.node_label
        }
        container {
          image = "nexus.isb/distantcash-docker-hosted/distant-cash/x-sell-ui:${var.image_version}"
          name = "x-sell-ui"
          port {
            container_port = 80
          }
        }
        image_pull_secrets {
          name = "regcred-nexus-isb"
        }
      }
    }
  }
}

resource "kubernetes_service" "x-sell-ui" {
  metadata {
    name = "x-sell-ui"
    namespace = var.namespace
  }
  spec {
    selector = {
      app = "x-sell-ui"
    }
    port {
      port = 80
      target_port = 80
    }
  }
}

resource "kubernetes_ingress" "x-sell-ui" {
  metadata {
    name = "x-sell-ui"
    namespace = var.namespace
    annotations = {
      "nginx.ingress.kubernetes.io/rewrite-target" = "/"
      "ingress.kubernetes.io/ssl-redirect" = "False"
      "cert-manager.io/issuer" = var.use_letsencrypt ? "letsencrypt-prod" : null
    }
  }
  spec {
    tls {
      hosts = [
        var.host
      ]
      secret_name = var.tls_secret_name
    }
    rule {
      host = var.host
      http {
        path {
          backend {
            service_name = "x-sell-ui"
            service_port = 80
          }
        }
      }
    }
  }
}
