#!/bin/bash

# ANSI Color Codes
# Use \e for printf compatibility
GREEN='\e[0;32m'
YELLOW='\e[1;33m'
NC='\e[0m' # No Color

# Get the absolute path to the project root where the script is run from
PROJECT_ROOT=$(pwd)

# Construct the path to the main script relative to the project root
# Ensure dist/index.js exists or adjust the path if needed
MAIN_SCRIPT_PATH="$PROJECT_ROOT/dist/index.js"

# Generate the JSON configuration
JSON_CONFIG=$(printf '{
  "mcpServers": {
    "timetime": {
      "command": "node",
      "args": [
        "%s"
      ]
    }
  }
}
' "$MAIN_SCRIPT_PATH")

# --- Output --- 
echo "---------------------------------------------------------------------"
# Use printf for lines with colors. Use %b to interpret escapes, %s for the string, and \n for newline.
printf "%b%s%b\n" "$YELLOW" "MCP Server Configuration for 'timetime':" "$NC"
echo ""
echo "This JSON configuration can be used to register the 'timetime' MCP server."
echo "It provides the command and arguments needed to start the server."
echo ""
printf "%b%s%b\n" "$GREEN" "$JSON_CONFIG" "$NC"
echo ""
echo "---------------------------------------------------------------------" 