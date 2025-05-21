<script lang="ts">
    const { cost } = $$props;

    function foramtAmount(amount: number) {
        return new Intl.NumberFormat('pl-PL', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(amount);
    }
</script>

<span>{foramtAmount(cost)}</span>