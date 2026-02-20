#!/bin/bash
# Rename DOCS.md -> MODULE.md and generate README.md for all packages
cd "$(dirname "$0")"

COUNT=0

for dir in packages/*/; do
  name=$(basename "$dir")
  docs_file="$dir/DOCS.md"
  module_file="$dir/MODULE.md"
  readme_file="$dir/README.md"

  if [ ! -f "$docs_file" ]; then
    echo "SKIP: $name (no DOCS.md)"
    continue
  fi

  # Parse frontmatter from DOCS.md
  title=$(sed -n 's/^title: "\(.*\)"/\1/p' "$docs_file")
  module=$(sed -n 's/^module: "\(.*\)"/\1/p' "$docs_file")
  package=$(sed -n 's/^package: "\(.*\)"/\1/p' "$docs_file")
  description=$(sed -n 's/^description: "\(.*\)"/\1/p' "$docs_file")
  category=$(sed -n 's/^category: "\(.*\)"/\1/p' "$docs_file")
  type=$(sed -n 's/^type: "\(.*\)"/\1/p' "$docs_file")
  auth=$(sed -n 's/^auth: "\(.*\)"/\1/p' "$docs_file")
  func_count=$(sed -n 's/^functionCount: \(.*\)/\1/p' "$docs_file")

  # Extract auth example from DOCS.md (the code block after ## Authentication)
  auth_block=""
  if [ "$auth" != "none" ]; then
    auth_block=$(awk '/^## Authentication/{found=1; next} found && /^```robinpath/{capture=1; next} capture && /^```/{exit} capture{print}' "$docs_file")
  fi

  # Rename DOCS.md -> MODULE.md
  mv "$docs_file" "$module_file"

  # Generate README.md
  cat > "$readme_file" << READMEEOF
# $title

> $description

**Package:** \`$package\` | **Category:** ${category^} | **Functions:** $func_count

## Install

\`\`\`bash
npm install $package
\`\`\`

## Usage

\`\`\`typescript
import { RobinPath } from "@wiredwp/robinpath";
import ${title}Module from "$package";

const rp = new RobinPath();
rp.registerModule(${title}Module.name, ${title}Module.functions);
rp.registerModuleMeta(${title}Module.name, ${title}Module.functionMetadata);
READMEEOF

  # Add auth example if needed
  if [ -n "$auth_block" ]; then
    cat >> "$readme_file" << READMEEOF

// Set credentials
await rp.executeScript(\`$auth_block\`);
READMEEOF
  fi

  cat >> "$readme_file" << READMEEOF
\`\`\`

## RobinPath Script

\`\`\`robinpath
READMEEOF

  # Add auth line in script example if needed
  if [ -n "$auth_block" ]; then
    echo "$auth_block" >> "$readme_file"
    echo "" >> "$readme_file"
  fi

  # Add a simple usage example based on module type
  cat >> "$readme_file" << READMEEOF
# Use $module functions
$module.help
\`\`\`

## Documentation

See [MODULE.md](./MODULE.md) for full API reference with all $func_count functions, parameters, and examples.

## License

MIT
READMEEOF

  COUNT=$((COUNT+1))
  echo "OK: $name"
done

echo ""
echo "Done: $COUNT modules processed"
