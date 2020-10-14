#!/usr/bin/env bash

set -e

function show_usage() {
    echo 'Usage:'
    echo "K8S_TOKEN=<token> K8S_HOST=<host> ./exec.sh [PARAMS]"
}

function require_environment() {
    NAME=$1
    if [[ -z "${!NAME}" ]]; then
        echo "Environment variable ${NAME} is not defined"
        show_usage
        exit 1
    fi
}

if [[ -f ./k8s ]]; then
  source ./k8s
  KUBECONFIG=/fake-config-file
fi

KUBECONFIG=${KUBECONFIG:-config}

if [[ -f "${KUBECONFIG}" ]]; then
  if [[ ! -z "${K8S_CONFIG}" ]]; then
    echo "${K8S_CONFIG}" | base64 -d > "${KUBECONFIG}"
  fi
else
  require_environment K8S_CONFIG
  echo "${K8S_CONFIG}" | base64 -d > "${KUBECONFIG}"
fi

require_environment K8S_TOKEN
require_environment K8S_HOST
require_environment K8S_KEY_PEM
require_environment K8S_CERT_PEM
require_environment K8S_CA_PEM
require_environment K8S_DEFAULT_NODE_GROUP
require_environment IMAGE_VERSION

export TF_VAR_kubeconfig="${KUBECONFIG}"
export TF_VAR_k8s_token="${K8S_TOKEN}"
export TF_VAR_k8s_host="${K8S_HOST}"
export TF_VAR_k8s_client_key="${K8S_KEY_PEM}"
export TF_VAR_k8s_client_cert="${K8S_CERT_PEM}"
export TF_VAR_k8s_cluster_ca_cert="${K8S_CA_PEM}"
export TF_VAR_k8s_default_node_group="${K8S_DEFAULT_NODE_GROUP}"
export TF_VAR_image_version="${IMAGE_VERSION}"

terraform $*

echo OK

exit 0
