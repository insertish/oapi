{
  pkgs ? import <nixpkgs> { },
}:

pkgs.mkShell rec {
  buildInputs = [
    pkgs.yarn
    pkgs.nodejs
  ];
}
