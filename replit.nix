{ pkgs }: {
    deps = [
        pkgs.python310Full
        pkgs.replitPackages.prybar-python310
        pkgs.replitPackages.stderred
        pkgs.python310Packages.poetry.out
        pkgs.nodejs-16_x.out
    ];
    env = {
      PYTHONHOME = "${pkgs.python310Full}";
      PYTHONBIN = "${pkgs.python310Full}/bin/python3.10";
      LANG = "en_US.UTF-8";
      STDERREDBIN = "${pkgs.replitPackages.stderred}/bin/stderred";
      PRYBAR_PYTHON_BIN = "${pkgs.replitPackages.prybar-python310}/bin/prybar-python310";
    };
}