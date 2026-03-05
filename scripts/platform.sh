#!/bin/bash
# Script para iniciar/detener la plataforma de forma limpia.
# Uso: ./scripts/platform.sh start | stop | status

set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PID_FILE="$PROJECT_DIR/.platform.pid"
DEFAULT_PORT=3000

cd "$PROJECT_DIR"

# Mata el árbol de procesos recursivamente
kill_tree() {
  local pid=$1
  for child in $(pgrep -P "$pid" 2>/dev/null); do
    kill_tree "$child"
  done
  kill -TERM "$pid" 2>/dev/null || true
  sleep 0.5
  kill -9 "$pid" 2>/dev/null || true
}

# Mata cualquier proceso en el puerto especificado
kill_port() {
  local port=$1
  if command -v lsof >/dev/null 2>&1; then
    local pids
    pids=$(lsof -ti ":$port" 2>/dev/null) || true
    if [ -n "$pids" ]; then
      echo "$pids" | xargs kill -9 2>/dev/null || true
    fi
  fi
}

start_platform() {
  if [ -f "$PID_FILE" ]; then
    pid=$(cat "$PID_FILE")
    if ps -p "$pid" >/dev/null 2>&1; then
      echo "La plataforma ya está en ejecución (PID $pid)."
      echo "  → http://localhost:$DEFAULT_PORT"
      return 0
    fi
    rm -f "$PID_FILE"
  fi

  echo "Iniciando plataforma..."
  npm run dev &
  local pid=$!
  echo $pid > "$PID_FILE"
  sleep 1
  if ps -p "$pid" >/dev/null 2>&1; then
    echo "Plataforma iniciada (PID $pid)."
    echo "  → http://localhost:$DEFAULT_PORT"
  else
    rm -f "$PID_FILE"
    echo "Error: la plataforma no pudo iniciar."
    return 1
  fi
}

stop_platform() {
  local stopped=0

  if [ -f "$PID_FILE" ]; then
    pid=$(cat "$PID_FILE")
    if ps -p "$pid" >/dev/null 2>&1; then
      echo "Deteniendo plataforma (PID $pid)..."
      kill_tree "$pid"
      stopped=1
    fi
    rm -f "$PID_FILE"
  fi

  echo "Comprobando puerto $DEFAULT_PORT..."
  if lsof -ti ":$DEFAULT_PORT" >/dev/null 2>&1; then
    echo "Cerrando procesos en puerto $DEFAULT_PORT..."
    kill_port "$DEFAULT_PORT"
    stopped=1
  fi

  if [ $stopped -eq 1 ]; then
    echo "Plataforma detenida."
  else
    echo "La plataforma no estaba en ejecución."
  fi
}

status_platform() {
  if [ -f "$PID_FILE" ]; then
    pid=$(cat "$PID_FILE")
    if ps -p "$pid" >/dev/null 2>&1; then
      echo "Plataforma en ejecución (PID $pid)."
      echo "  → http://localhost:$DEFAULT_PORT"
      return 0
    fi
  fi

  if lsof -ti ":$DEFAULT_PORT" >/dev/null 2>&1; then
    echo "Hay un proceso en puerto $DEFAULT_PORT (posible instancia huérfana)."
    echo "  Ejecuta './scripts/platform.sh stop' para limpiar."
  else
    echo "Plataforma detenida."
  fi
}

case "${1:-}" in
  start)
    start_platform
    ;;
  stop)
    stop_platform
    ;;
  status)
    status_platform
    ;;
  restart)
    stop_platform
    sleep 2
    start_platform
    ;;
  *)
    echo "Uso: $0 {start|stop|status|restart}"
    echo ""
    echo "  start   - Inicia la plataforma (npm run dev)"
    echo "  stop    - Detiene la plataforma y limpia procesos colgados"
    echo "  status  - Muestra el estado actual"
    echo "  restart - Detiene e inicia de nuevo"
    exit 1
    ;;
esac
