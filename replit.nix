{ pkgs }: {
    deps = [
        pkgs.python310
        pkgs.python310Packages.psycopg
        pkgs.python310Packages.fastapi
        pkgs.python310Packages.poetry-core
        pkgs.python310Packages.poetry.out
        pkgs.python310Packages.poetry
        pkgs.nodejs-16_x.out
    ];
}