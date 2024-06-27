<#
.SYNOPSIS
    Gets the latest version of Node.
.DESCRIPTION
    Gets the latest version of node by examining https://nodejs.org/dist/index.json.
.EXAMPLE
    .\tools\Get-LatestNodeVersion.ps1

    Latest LTS
    ------ ---
    22.3.0 20.15.0
.EXAMPLE
    .\tools\Get-LatestNodeVersion.ps1 -OutputType LTS

    Major  Minor  Patch  PreReleaseLabel BuildLabel
    -----  -----  -----  --------------- ----------
    20     15     0
.EXAMPLE
    .\tools\Get-LatestNodeVersion.ps1 -OutputType Latest


    Major  Minor  Patch  PreReleaseLabel BuildLabel
    -----  -----  -----  --------------- ----------
    22     3      0
#>

param (
    # Specifies to only return either the LTS or Latest version.
    # If omitted, then both are returned as properties of the
    # output object.
    [Parameter(
        Mandatory = $false
    )]
    [ValidateSet("LTS", "Latest")]
    [string]
    $OutputType = $null
)

Write-Host $OutputType

$output = (Invoke-RestMethod https://nodejs.org/dist/index.json)
| Select-Object -Property version, lts
| ForEach-Object { 
    $_.version = [semver]::Parse($_.version.Replace('v', ''))
    $_.lts = ($_.lts -ne $false)
    $_
}
| Sort-Object -Property version -Descending
| Group-Object -Property lts
| ForEach-Object { $_.Group | Select-Object -First 1 }

$output = [PSCustomObject]@{
    Latest = $output | Where-Object { $_.lts -eq $false } | Select-Object -ExpandProperty Version
    LTS    = $output | Where-Object { $_.lts -eq $true } | Select-Object -ExpandProperty Version
}

if ($OutputType -eq 'LTS') {
    return $output.LTS
}
elseif ($OutputType -eq 'Latest') {
    return $output.Latest
}
return $output;
