#!/usr/bin/env bash

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

ARTIFACT_ID="private-chef-backend"
VERSION="1.0.0"
JAR_NAME="${ARTIFACT_ID}-${VERSION}.jar"
JAR_PATH="${BACKEND_DIR}/target/${JAR_NAME}"

REMOTE_USER="${REMOTE_USER:-root}"
REMOTE_HOST="${REMOTE_HOST:-47.111.17.110}"
REMOTE_PATH="${REMOTE_PATH:-/opt/private-chef/${JAR_NAME}}"
IDENTITY_FILE="${IDENTITY_FILE:-${HOME}/.ssh/id_rsa}"

echo "==> Building backend jar (${JAR_NAME})"
(cd "${BACKEND_DIR}" && mvn clean package -DskipTests)

if [[ ! -f "${JAR_PATH}" ]]; then
  echo "Error: ${JAR_PATH} not found. Build may have failed." >&2
  exit 1
fi

echo "==> Uploading artifact to ${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}"
ssh -i "${IDENTITY_FILE}" "${REMOTE_USER}@${REMOTE_HOST}" "mkdir -p \"$(dirname "${REMOTE_PATH}")\""
scp -i "${IDENTITY_FILE}" "${JAR_PATH}" "${REMOTE_USER}@${REMOTE_HOST}:${REMOTE_PATH}"

echo "✅ Deployment package uploaded successfully."
