{ pkgs ? import <nixpkgs> {} }:

pkgs.mkShell {
  buildInputs = with pkgs; [
    # JavaScript/TypeScript runtime and package manager
    bun 
    nodejs
    # Optional: Additional useful tools
    # nodejs_20        # For compatibility with Node.js tools
    # typescript       # TypeScript compiler
    # git              # Version control
    # curl             # HTTP requests
    # jq               # JSON processing
  ];

  shellHook = ''
    echo "🥟 Bun development environment loaded!"
    echo "Bun version: $(bun --version)"
    echo ""
    echo "Available commands:"
    echo "  bun init          - Initialize a new project"
    echo "  bun install       - Install dependencies"
    echo "  bun run <script>  - Run a script"
    echo "  bun dev           - Start development server"
    echo "  bun test          - Run tests"
    echo "  bun build         - Build for production"
    echo ""
    echo "To get started:"
    echo "  mkdir my-project && cd my-project"
    echo "  bun init"
    echo ""
  '';
}
